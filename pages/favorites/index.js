import React from 'react';
import {Container, Grid } from '@mantine/core';
import axios from 'axios';
import BookContainer from '../../components/BookContainer';

const url = "http://localhost:3000/api/favorites";

const Favorites = ({favorites}) => {

  return (
    <Container>
      <h1>List of favorite books</h1>
      <Grid>
        {favorites.map( book => (
          <Grid.Col span={6} key={book.isbn}>
            <BookContainer 
              bookCover={book.book['book_image']}
              title={book.book.title}
              author={book.book.author}
              isbn={book.isbn}
              notes={book.notes}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  )
}

export const getServerSideProps = async () => {
	const { data } = await axios.get(url);
	return {
		props: {
			favorites: data.data,
		},
	};
};

export default Favorites;