import type { IconName } from '../components/Icon'
import { photos } from '../lib/images'

export const navLinks = [
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'modalidades', label: 'Modalidades' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'planos', label: 'Planos' },
  { id: 'faq', label: 'Dúvidas' },
] as const

export const TRIAL_SECTION_ID = 'aula-experimental'

export const interests = [
  { value: 'musculacao', label: 'Musculação' },
  { value: 'funcional', label: 'Treino funcional' },
  { value: 'combinado', label: 'Musculação + funcional' },
  { value: 'acompanhamento', label: 'Acompanhamento individual' },
  { value: 'orientacao', label: 'Ainda não sei — quero orientação' },
] as const

export type Interest = (typeof interests)[number]['value']

/** Benefícios gerais da atividade física regular — sem números ou resultados prometidos. */
export const benefits: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'activity',
    title: 'Mais disposição',
    text: 'A prática regular de exercícios tende a melhorar o condicionamento e a energia para as tarefas do dia a dia.',
  },
  {
    icon: 'dumbbell',
    title: 'Força e autonomia',
    text: 'Treinar força ajuda a preservar músculos, articulações e mobilidade — base para se movimentar bem em qualquer idade.',
  },
  {
    icon: 'heart',
    title: 'Saúde em dia',
    text: 'Exercício orientado é um aliado reconhecido da saúde cardiovascular e metabólica, ao lado de sono e alimentação.',
  },
  {
    icon: 'sun',
    title: 'Bem-estar mental',
    text: 'Ter um momento só seu, com rotina e objetivo, contribui para lidar melhor com o estresse e melhorar o humor.',
  },
]

export const modalities: {
  id: Interest
  title: string
  tag: string
  text: string
  points: string[]
  photo: string
  alt: string
}[] = [
  {
    id: 'musculacao',
    title: 'Musculação',
    tag: 'Força',
    text: 'Área ampla com pesos livres, racks e máquinas para treinos de força, hipertrofia e condicionamento.',
    points: ['Pesos livres e máquinas guiadas', 'Ficha de treino individual', 'Orientação de professores no salão'],
    photo: photos.strength,
    alt: 'Atleta segurando um halter em uma academia com iluminação escura',
  },
  {
    id: 'funcional',
    title: 'Funcional',
    tag: 'Movimento',
    text: 'Aulas dinâmicas em turmas reduzidas, combinando força, resistência e coordenação em movimentos completos.',
    points: ['Turmas com número limitado', 'Cordas, kettlebells e peso corporal', 'Intensidade adaptada a cada aluno'],
    photo: photos.functional,
    alt: 'Cordas de treino funcional estendidas no piso de uma academia',
  },
  {
    id: 'acompanhamento',
    title: 'Acompanhamento',
    tag: 'Individual',
    text: 'Para quem quer atenção próxima: avaliação, planejamento e ajustes frequentes com um profissional dedicado.',
    points: ['Avaliação física inicial', 'Planejamento por ciclos', 'Reavaliações periódicas'],
    photo: photos.coaching,
    alt: 'Profissional auxiliando um aluno durante o supino na academia',
  },
]

export const facilities: { icon: IconName; label: string }[] = [
  { icon: 'dumbbell', label: 'Pesos livres e máquinas' },
  { icon: 'layers', label: 'Espaço funcional dedicado' },
  { icon: 'shield', label: 'Vestiários completos' },
  { icon: 'clock', label: 'Horários amplos' },
]

export const differentials: { title: string; text: string }[] = [
  {
    title: 'Método antes da intensidade',
    text: 'Todo aluno começa com uma conversa sobre objetivos, histórico e rotina. O treino nasce desse diagnóstico — não de uma ficha padrão.',
  },
  {
    title: 'Professores presentes no salão',
    text: 'Equipe circulando durante todo o horário de funcionamento para corrigir execução, ajustar cargas e tirar dúvidas.',
  },
  {
    title: 'Ambiente sem intimidação',
    text: 'Um espaço pensado para iniciantes e experientes treinarem lado a lado, cada um no seu ritmo e com respeito.',
  },
  {
    title: 'Evolução acompanhada',
    text: 'Treinos organizados em ciclos, com revisões periódicas para manter a progressão segura e consistente.',
  },
]

/** Planos demonstrativos — valores ilustrativos, não constituem oferta comercial. */
export const plans: {
  name: string
  interest: Interest
  price: string
  description: string
  features: string[]
  featured?: boolean
}[] = [
  {
    name: 'Essencial',
    interest: 'musculacao',
    price: '119',
    description: 'Para quem quer treinar musculação com orientação no salão.',
    features: ['Acesso à musculação', 'Ficha de treino individual', 'Avaliação inicial'],
  },
  {
    name: 'Completo',
    interest: 'combinado',
    price: '169',
    description: 'Musculação e aulas de funcional para uma rotina variada.',
    features: ['Tudo do Essencial', 'Aulas de funcional ilimitadas', 'Reavaliação trimestral'],
    featured: true,
  },
  {
    name: 'Acompanhado',
    interest: 'acompanhamento',
    price: '349',
    description: 'Atenção individual com um profissional dedicado.',
    features: ['Tudo do Completo', 'Sessões com profissional dedicado', 'Planejamento por ciclos'],
  },
]

export const trialSteps = [
  { title: 'Conte seu interesse', text: 'Informe seu nome e o que você quer experimentar.' },
  { title: 'Combine o horário', text: 'A equipe confirma o melhor dia e horário com você.' },
  { title: 'Treine com orientação', text: 'Faça a aula acompanhado por um professor, sem compromisso.' },
]

export const faq: { q: string; a: string }[] = [
  {
    q: 'Preciso ter experiência para começar?',
    a: 'Não. O treino é montado a partir do seu nível atual, e a equipe acompanha a execução dos exercícios desde o primeiro dia.',
  },
  {
    q: 'Como funciona a aula experimental?',
    a: 'Você escolhe a modalidade, agenda um horário e treina acompanhado por um professor. É uma forma de conhecer o espaço e o método antes de decidir.',
  },
  {
    q: 'O que devo levar no primeiro dia?',
    a: 'Roupa confortável, tênis fechado, garrafa de água e uma toalha pequena. Se tiver alguma condição de saúde, consulte seu médico antes de iniciar.',
  },
  {
    q: 'Posso trocar de plano depois?',
    a: 'Neste projeto demonstrativo, os planos são ilustrativos. Em uma academia real, regras de troca, fidelidade e cancelamento devem estar descritas em contrato.',
  },
  {
    q: 'A Atlas Fitness existe?',
    a: 'Não. A Atlas Fitness é uma academia fictícia, e este site é um projeto demonstrativo de portfólio. Nomes, valores, endereço e horários são ilustrativos.',
  },
]
