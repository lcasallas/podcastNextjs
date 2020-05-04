import Link from 'next/link';
import slug from '../helpers/slug'

export default class PodcastList extends React.Component {
  render(){
    const { audioClips, onClickPodcast } = this.props;
    return(
      <>
        <div>
          {
            audioClips.map(item=>{
              return(
                <Link href={`/podcast?id=${item.id}`} as={`/${slug(item.channel.title)}/${slug(item.title)}`} key={item.id}>
                  <a className="podcast" onClick={(event)=>onClickPodcast(event,item)}>
                    <h3>{item.title}</h3>
                    <div className="meta">
                      {Math.ceil(item.duration/60)} minutes
                    </div>
                  </a>
                </Link>
              )
            })
          }
        </div>      
        <style jsx>{`
          
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          a.channel {
            display: block;
            margin-bottom: 0.5em;
            color: #333;
            text-decoration: none;
          }
          .channel img {
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
            width: 100%;
          }
          h1 {
            font-weight: 600;
            padding: 15px;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }

          .podcast {
            display: block;
            text-decoration: none;
            color: #333;
            padding: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            cursor: pointer;
          }
          .podcast:hover {
            color: #000;
          }
          .podcast h3 {
            margin: 0;
          }
          .podcast .meta {
            color: #666;
            margin-top: 0.5em;
            font-size: 0.8em;
          }
        `}</style>
      </>
    )
  }
}