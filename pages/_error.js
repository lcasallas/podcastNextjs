import Layout from '../components/Layout';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <Layout title='Oh no :('>
      { statusCode === 404 ?
        <div className='message'>
          <h1>Esta pagina no existe :(</h1>
        </div>
        :
        <div className='message'>
          <h1>Hubo un problema :(</h1>
          <p>
            <Link href='/'>
              <a>Volver a la home</a>
            </Link>
          </p>
        </div>
      }
      <style jsx>{`
        .message {
          padding: 100px 30px;
          text-align: center;
        }
        h1 {
          margin-bottom: 2em;
        }
        a {
          color: #8756ca;
        }
      `}</style>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error