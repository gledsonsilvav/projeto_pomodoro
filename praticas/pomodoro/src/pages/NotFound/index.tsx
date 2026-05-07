import { Container } from '../../components/Container';
import { GenericHtml } from '../../components/GenericHtml';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <GenericHtml>
          <Heading>404 - Página não encontrada 🚀</Heading>
          <p>
            Opa! Parece que a página que você está tentando acessar não existe.
          </p>
          <p>
            Dá pra voltar em segurança para a <a href='/'>página principal</a>.
          </p>
        </GenericHtml>
      </Container>
    </MainTemplate>
  );
}