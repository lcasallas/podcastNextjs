import Link from 'next/link';
import slug from '../helpers/slug';

export default class extends React.Component{

  // static async getInitialProps({ query }){
  //   let response = await fetch(`https://api.audioboom.com/audio_clips/${query.id}.mp3`);
  //   let data = await response.json();   
  //   let dataAudio = data.body.audio_clip;
  //   return {dataAudio};
  // }

  render(){
    const { dataAudio, onClose } = this.props;
    return(
      <>
        <header>Podcasts</header>
        <div className='modal'>
          <div className='clip'>
            <nav>
              <Link href={`/channel?id=${dataAudio.channel.id}`} as={`/${slug(dataAudio.channel.title)}`}>
                <a className='close' onClick={onClose}>&lt; Volver</a>
              </Link>
            </nav>

            <picture>
              <div style={{ backgroundImage: `url(${dataAudio.urls.image || dataAudio.channel.urls.logo_image.original})` }} />
            </picture>

            <div className='player'>
              <h3>{ dataAudio.title }</h3>
              <h6>{ dataAudio.channel.title }</h6>
              <audio controls autoPlay={true}>
                <source src={dataAudio.urls.high_mp3} type='audio/mpeg' />
              </audio>
            </div>
          </div>
        </div>
        <style jsx>{`
          nav {
            background: none;
          }
          nav a {
            display: inline-block;
            padding: 15px;
            color: white;
            cursor: pointer;
            text-decoration: none;
          }
          .clip {
            display: flex;
            height: 100%;
            flex-direction: column;
            background: #8756ca;
            color: white;
          }
          picture {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1 1;
            flex-direction: column;
            width: auto;
            padding: 10%;
          }
          picture div {
            width: 100%;
            height: 100%;
            background-position: 50% 50%;
            background-size: contain;
            background-repeat: no-repeat;
          }
          .player {
            padding: 30px;
            background: rgba(0,0,0,0.3);
            text-align: center;
          }
          h3 {
            margin: 0;
          }
          h6 {
            margin: 0;
            margin-top: 1em;
          }
          audio {
            margin-top: 2em;
            width: 100%;
          }

          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>
      </>
    );
  }
}