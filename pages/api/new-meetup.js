import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://dnanusevski:djYCU3eAaQnK5SMa@cluster0.ctznz.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne({
      data, // it will be like { title, image, address, description } or to be more bliunt {title:title, image:image, address: address ....}
    });

    console.log(result);

    client.close();
    // return result that we have inserted something successfully
    res.status(201).json({
      message: "Meetup inserted",
    });
  }
}

export default handler;
