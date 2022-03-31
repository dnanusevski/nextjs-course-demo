import { MongoClient } from "mongodb";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta name = "description" content = "Browse a huge list of highly active React meetups !" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch some data
  // read some data from database
  const client = await MongoClient.connect(
    "mongodb+srv://dnanusevski:djYCU3eAaQnK5SMa@cluster0.ctznz.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray(); //gets all data

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // to rebuild the page and to get new ontent each time the request to page is made, and if 1 second has passed untill last request to page
  };
}

/*
// in order to always revalidate the page and not every second or similar like in the function above. So whenever the page is requested you get it again

export async function getServerSideProps(context){
  const req = context.req;  // to check seesion cookie or similar.
  const res = context.res;

  // fetch some data
  // read some data from database

  return {
    props:{
      meetups: DUMMY_MEETUPS
    },
  };
}
*/

export default HomePage;
