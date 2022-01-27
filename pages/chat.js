import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import appConfig from '../config.json'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

export default function ChatPage({ SUPABASE_ANON_KEY, SUPABASE_URL }) {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    supabaseClient
      .from('Messages')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        console.log('Dados: ', data)
        setMessageList(data)
      })
  }, [])

  function handleNewMessage(newMessage) {
    const message = {
      // id: messageList.length + 1,
      de: username,
      text: newMessage
    }

    if (message.text === '') {
      return
    }

    supabaseClient
      .from('Messages')
      .insert([message])
      .then(({ data }) => {
        setMessageList([data[0], ...messageList])
      })

    setMessage('')
  }

  function handleDeleteMessage(messageAtual) {
    const messageId = messageAtual.id
    const messageListFiltered = messageList.filter(messageFiltered => {
      return messageFiltered.id != messageId
    })

    setMessageList(messageListFiltered)
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(https://wallpaper.dog/large/17167859.gif)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px'
          }}
        >
          <MessageList
            mensagens={messageList}
            handleDeleteMessage={handleDeleteMessage}
          />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              value={message}
              onChange={event => {
                const value = event.target.value
                setMessage(value)
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleNewMessage(message)
                }
              }}
              placeholder="Insira sua message aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
            <Button
              iconName="arrowRight"
              onClick={event => {
                event.preventDefault()
                handleNewMessage(message)
              }}
              type="submit"
              size="xl"
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  const handleDeleteMessage = props.handleDeleteMessage
  const username = props.username

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px'
      }}
    >
      {props.mensagens.map(message => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700]
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px'
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px'
                }}
                src={`https://github.com/${message.de}.png`}
              />
              <Text tag="strong">{message.de}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300]
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                onClick={event => {
                  event.preventDefault()
                  handleDeleteMessage(message)
                }}
                label="X"
                data-id={message.id}
                styleSheet={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                  color: '#FFF',
                  backgroundColor: 'rgba(0,0,0,.5)',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              ></Button>
            </Box>
            {message.text}
          </Text>
        )
      })}
    </Box>
  )
}

export const getServerSideProps = async () => {
  const { SUPABASE_ANON_KEY, SUPABASE_URL } = process.env

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL
    }
  }
}
