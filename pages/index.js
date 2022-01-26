import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'

export function Title(props) {
  const Tag = props.tag || 'h1'
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default function HomePage() {
  const [username, setUsername] = useState('')
  const [data, setData] = useState({ name: '', location: '' })
  const errorImage =
    'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132__340.png'
  const router = useRouter()

  function handleUsername(event) {
    const username = event.target.value
    setUsername(username)
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
  }, [])

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(https://wallpaper.dog/large/17167859.gif)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            width: '100%',
            maxWidth: '700px',
            borderRadius: '5px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700]
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={event => {
              event.preventDefault()
              router.push('/chat')
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            <Title tag="h2">Bem vindo!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              fullWidth
              onChange={handleUsername}
              placeholder="Digite seu usuário do GitHub"
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800]
                }
              }}
            />
            {username.length > 2 &&
              username.length !== null &&
              username.trim() && (
                <Button
                  type="submit"
                  label="Entrar"
                  fullWidth
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals['000'],
                    mainColor: appConfig.theme.colors.primary[500],
                    mainColorLight: appConfig.theme.colors.primary[400],
                    mainColorStrong: appConfig.theme.colors.primary[600]
                  }}
                />
              )}
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px'
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px'
              }}
              src={
                username.length > 2 &&
                username.length !== null &&
                username.trim()
                  ? `https://github.com/${username}.png`
                  : errorImage
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username.length > 2 && username !== null && username.trim()
                ? username
                : 'Não há nenhum usuário'}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {data.name}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300]
              }}
            >
              {data.location}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  )
}
