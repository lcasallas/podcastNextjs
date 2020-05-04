import Error from './_error';

import Layout from '../components/Layout';
import ChannelsGrid from '../components/ChannelsList'
import PodcastList from '../components/PodcastList';
import PodcastPlayer from '../components/PodcastPlayer';

export default class extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      openPodcast: null,
    }
  }
  
  static async getInitialProps({ query, res }){
    const idChannel = query.id

    try{
      let [reqChannel, reqSeries, reqAudios ] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ]);

      if ( reqChannel.status >= 400 ){
        res.statusCode = reqChannel.status;
        return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status }
      }
  
      let dataChannel = await reqChannel.json();
      let channel = dataChannel.body.channel;
  
      let dataSeries = await reqSeries.json();
      let series = dataSeries.body.channels;
  
      let dataAudios = await reqAudios.json();
      let audioClips = dataAudios.body.audio_clips;
  
  
      return  { channel, audioClips, series, statusCode: 200 };
    } catch(error){
      return { channel: null, audioClips: null, series: null, statusCode: 503 }
    }
  }
  
  handleOpenPodcast = (event, podcast) => {
    console.log('PODCAST_DAT', podcast);
    event.preventDefault();

    this.setState({
      openPodcast: podcast,
    })
  }

  handleCloseModal = (event)=>{
    event.preventDefault();

    this.setState({
      openPodcast: null
    })
  }

  render(){
    const { channel, audioClips, series, statusCode } = this.props;
    const { openPodcast } = this.state;

    
    if ( statusCode !== 200 ){
      return <Error statusCode={ statusCode }/>
    } 
    
    return(
      <Layout title={`${channel.title} - podcast`}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        {
          openPodcast && <PodcastPlayer dataAudio={openPodcast} onClose={this.handleCloseModal}/>
        }
        <h1>{channel.title}</h1>

        { series.length > 0 &&
          <>
            <h2>Series</h2>
            <ChannelsGrid channels={series} />
          </>
        }

        <h2>Ultimos podcast</h2>
        {
          audioClips.length > 0 && 
          <PodcastList audioClips = {audioClips} onClickPodcast={this.handleOpenPodcast}/>
        }
        
        <style jsx>{`
          h2 {
            text-align: center;
          }
          
          .banner {
            width: 100%;
            padding-bottom: 25%;
            background-position: 50% 50%;
            background-size: cover;
            background-color: #aaa;
          }
        `}</style>
      </Layout>
    )
  }
}