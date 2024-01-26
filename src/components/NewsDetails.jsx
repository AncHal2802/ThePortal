import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NewsDetails() {
  const { index } = useParams();
  const newsIndex = parseInt(index, 10);
  const [newsDetails, setNewsDetails] = useState(0);

  useEffect(() => {
    // Fetch the specific news article using its index
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=13aa3840ad6542d1b4f13aa762e81db9`; // Replace with your API key
    axios.get(apiUrl)
      .then((response) => {
        const articles = response.data.articles;
        if (articles && articles.length > newsIndex) {
          setNewsDetails(articles[newsIndex]);
        } else {
          setNewsDetails(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setNewsDetails(null);
      });
  }, [newsIndex]);

  if (!newsDetails) {
    return <div>No details found for this news.</div>;
  }

  return (
    <div>
      <h2>{newsDetails.title}</h2>
      <p>{newsDetails.description}</p>
    </div>
  );
}

export default NewsDetails;
