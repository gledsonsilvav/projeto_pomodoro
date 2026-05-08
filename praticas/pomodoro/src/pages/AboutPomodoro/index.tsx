import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

export function AboutPomodoro() {
  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>A Técnica Pomodoro 🍅</Heading>
          <p>
            A Técnica Pomodoro é uma metodologia de produtividade criada por{' '}
            <strong>Francesco Cirillo</strong>.
          </p>

          <img src='https://placehold.co/600x300' alt='Pomodoro Timer' />

          <h2>Como funciona?</h2>
          <ul>
            <li><strong>1.</strong> Defina uma tarefa.</li>
            <li><strong>2.</strong> Trabalhe por 25 minutos.</li>
            <li><strong>3.</strong> Pausa curta de 5 minutos.</li>
          </ul>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}