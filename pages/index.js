import { useState, useRef } from 'react';
import axios from 'axios';
import {Container, SimpleGrid, ActionIcon } from '@mantine/core';

const url = "http://localhost:3000/api/books";

const Home = (props) => {
	const [books, setBooks]  = useState(props.bookList);

	const displayBooks = () => {
		const bookList = books;
		console.log(bookList)
		return (
			bookList.map( (book,i) => (
				<div 
					key={book['primary-isbn13']}
				>
					<img 
						src={book['book_image']} 
						width={175}
					/>
					<div>{book.title}</div>
					<div>{book.author}</div>
					<ActionIcon
						onClick={() => handleClick(book['primary_isbn13'])}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fd0061" fill={book.added?"#fd0061":"none"} strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
						</svg>
					</ActionIcon>
				</div>
			))
		)
	}

	const handleClick = (isbn) => {
		const tempBooks = [...books]
		let bookIndex = tempBooks.findIndex( b => b['primary_isbn13'] === String(isbn));
		let bookToAdd = tempBooks[bookIndex];

		if (bookToAdd.added) {
			removeBook(tempBooks, bookIndex);
		} else {
			handleAdd(tempBooks, bookIndex);
		}	}

const removeBook = async (tempBooks, bookIndex) => {
	let bookToAdd = tempBooks[bookIndex];
	try {
		const { data } = await axios.delete(url + '/' + bookToAdd['primary_isbn13'])
		delete bookToAdd.added;
		tempBooks[bookIndex] = bookToAdd;
		setBooks(tempBooks)
	} catch (error) {
		console.log(error)
	}
}

const handleAdd = async (tempBooks, bookIndex) => {
	let bookToAdd = tempBooks[bookIndex];

	try {
		const { data } = await axios.post(url, 
			{ 
				isbn: `${bookToAdd['primary_isbn13']}`,
				book: bookToAdd, 
			})
		bookToAdd.added=true;
		tempBooks[bookIndex] = bookToAdd;
		setBooks(tempBooks)
	} catch (error) {
		console.log('ERROR: ', error);
	}
}

	return (
		<Container>
			<div>
				<h1>Top New York Times Best Sellers</h1>
				<SimpleGrid cols={5}>
					{displayBooks()}
				</SimpleGrid>
			</div>
		</Container>
	)
}

export const getServerSideProps = async () => {
	const { data } = await axios.get(url);
	return {
		props: {
			bookList: data.data,
		},
	};
};

export default Home;