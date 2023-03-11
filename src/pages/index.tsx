import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Home() {
  return (
    <>
      <Head>
        <title>Quizae</title>
        <meta name="description" content="A Trivia App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <Container className="mt-3">
              <Row>
                  <Col>
                      <h1 className="text-center">Quizae</h1>
                  </Col>
              </Row>
          </Container>
      </main>
    </>
  )
}
