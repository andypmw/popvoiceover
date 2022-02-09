import type { NextPage } from 'next'
import MainLayout from '../components/main-layout';
import axios from 'axios';

const Home: NextPage = ( data ) => {

  return (
    <MainLayout
      translateSourceLanguages={data.translateSourceLanguages}
      speechLanguages={data.speechLanguages}
      translateToPollyMap={data.translateToPollyMap}
    />
  );

}

export async function getServerSideProps() {

  const translateSourceLanguages = await (await axios.get('http://localhost:4000/translates/source-languages')).data;
  const speechLanguages = await (await axios.get('http://localhost:4000/speeches/speech-languages')).data;
  const translateToPollyMap = await (await axios.get('http://localhost:4000/translates/translate-to-polly-map')).data;

  return {
    props: {
      translateSourceLanguages,
      speechLanguages,
      translateToPollyMap
    }
  }
}

export default Home
