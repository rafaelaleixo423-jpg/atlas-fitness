import { useEffect, useRef, useState } from 'react'
import { media } from '../lib/images'
import { Icon } from './Icon'

/** Segundos de "mergulho no escuro" de cada lado do corte do loop, para esconder o salto fim → início. */
const LOOP_FADE = 0.45

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

/** Sem vídeo para quem pede menos movimento ou economia de dados — nesses casos ele nem é baixado. */
function canPlayVideo() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true
  return !window.matchMedia(reducedMotionQuery).matches && !saveData
}

/**
 * Vídeo de fundo da hero. Fica sobre a imagem de fallback e só aparece quando começa a tocar;
 * se falhar ou o autoplay for bloqueado, a imagem continua visível.
 */
export function HeroVideo() {
  const [enabled, setEnabled] = useState(canPlayVideo)
  const [ready, setReady] = useState(false)
  const [paused, setPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const pausedByUser = useRef(false)

  useEffect(() => {
    const query = window.matchMedia(reducedMotionQuery)
    const onChange = () => setEnabled(canPlayVideo())
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // Escurece suavemente perto do fim e do início de cada volta, sincronizado com os quadros exibidos.
  useEffect(() => {
    const video = videoRef.current
    const shade = shadeRef.current
    if (!enabled || !video || !shade) return

    const update = (time: number) => {
      if (!video.duration) return
      const edge = Math.min(time, video.duration - time)
      shade.style.opacity = edge < LOOP_FADE ? String(1 - edge / LOOP_FADE) : '0'
    }

    // `timeupdate` é a rede de segurança: dispara mesmo quando a página renderiza poucos quadros.
    const onTime = () => update(video.currentTime)
    video.addEventListener('timeupdate', onTime)

    if (typeof video.requestVideoFrameCallback === 'function') {
      let id = 0
      const onFrame: VideoFrameRequestCallback = (_now, meta) => {
        update(meta.mediaTime)
        id = video.requestVideoFrameCallback(onFrame)
      }
      id = video.requestVideoFrameCallback(onFrame)
      return () => {
        video.cancelVideoFrameCallback(id)
        video.removeEventListener('timeupdate', onTime)
      }
    }

    let raf = 0
    const tick = () => {
      update(video.currentTime)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('timeupdate', onTime)
    }
  }, [enabled])

  // Pausa fora da tela (economiza bateria e CPU) e retoma ao voltar, salvo se o usuário pausou.
  useEffect(() => {
    const video = videoRef.current
    if (!enabled || !video) return
    // React não reflete `muted` como atributo; alguns navegadores móveis exigem o atributo para autoplay.
    video.muted = true
    video.setAttribute('muted', '')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !pausedByUser.current) video.play().catch(() => {})
      else video.pause()
    })
    observer.observe(video)
    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) return null

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    pausedByUser.current = !video.paused
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-20 bg-ink-950 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
      >
        <video
          ref={videoRef}
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onError={() => setEnabled(false)}
          className="size-full object-cover object-[66%_center] lg:object-[70%_center]"
        />
        <div ref={shadeRef} className="absolute inset-0 bg-ink-950" style={{ opacity: 1 }} />
      </div>

      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'}
          className="absolute right-5 bottom-5 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-ink-950/40 text-white/80 backdrop-blur transition hover:border-white/50 hover:text-white sm:right-8 sm:bottom-8"
        >
          <Icon name={paused ? 'play' : 'pause'} className="size-4" strokeWidth={2} />
        </button>
      )}
    </>
  )
}
