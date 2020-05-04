import 'isomorphic-fetch';
import Error from './_error';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelsList';

export default class extends React.Component {

  static async getInitialProps({ res }) {
    try {
      let response = await fetch('https://api.audioboom.com/channels/recommended')
      let { body: channels } = await response.json();
  
      return  { channels, statusCode: 200 };
    } catch ( error ){
      res.statusCode = 503;
      return { channels: [], statusCode: 503 }
    }
  }
  render(){
    const { channels, statusCode } = this.props;

    if ( statusCode !== 200 ){
      return <Error statusCode={ statusCode }/>
    }
    return(
      <>
        <Layout title='Podcast'>
          <ChannelGrid channels={channels}/>          
        </Layout>
      </>
    );
  }
}