import React, { useState, useRef } from 'react';
import { IconHeart } from '@tabler/icons';
import { Card, Image, Text, Group, Button, ActionIcon, createStyles, Stack, Space, Textarea } from '@mantine/core';
import { openModal } from '@mantine/modals';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },

  cardImage: {
    marginLeft: theme.spacing.xs,
  }
}));

const BookContainer = ({bookCover, title, author, isbn, notes}) => {
  const [value, setValue] = useState(notes ? notes : '');
  const refContainer = useRef(value)
  const { classes, theme } = useStyles();
  
  const handleClick = async (isbn) => {
    const url = "http://localhost:3000/api/books";
    try {
      await axios.delete(url + '/' + isbn)
    } catch (error) {
      console.error(error)
    }
  }

  const handleTextInput = (e) => {
    setValue(e.target.value);
  }

  const handleModal = () => {
    openModal(
      {
        title: title,
        children: (
          <>
            <Text>{author}</Text>
            <Textarea
              label="Notes"
              defaultValue={value}
              key={value}
              placeholder="What do you want to gain from this book?"
              onChange={handleTextInput}
              minRows={4}
              ref={refContainer}
            />
            <Space w="sm"/>
            <Button 
              radius="md" 
              style={{ flex: 1 }}
              onClick={() => handleSave()}
            >
              Save
            </Button>
          </>
        )
      }
    )
  }

  const handleSave = async () => {
    console.log(refContainer.current.value)
    const url = "http://localhost:3000/api/favorites";
    await axios.put(url + '/' + isbn, {notes: refContainer.current.value})

  }

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Group noWrap>
        <Card.Section className={classes.cardImage}>
          <Image src={bookCover} alt={title} height={180} />
        </Card.Section>
        <Space w="sm" />
          <Stack justify="space-around">
            <Group >
              <Stack>
                <Text size="lg" weight={500}>
                  {title}
                </Text>
                <Text size="lg" weight={500}>
                  {author}
                </Text>
              </Stack>
            </Group>
            <Text size="sm" mt="xs">
              {/* {description} */}
            </Text>
            <Group mt="xs">
              <Button 
                radius="md" 
                style={{ flex: 1 }}
                onClick={() => handleModal()}
              >
                View
              </Button>
              <ActionIcon 
                variant="default" 
                radius="md" 
                size={36}
                onClick={() => handleClick(isbn)}>
                <IconHeart size={18} className={classes.like} stroke={1.5} fill="#fd0061"/>
              </ActionIcon>
            </Group>
          </Stack>
      </Group>
  </Card>
  )
}

export default BookContainer;