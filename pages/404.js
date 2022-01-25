import { Box, Button, Text } from '@skynexui/components'
import appConfig from '../config.json'
import { useRouter } from 'next/router'

export default function PageError() {
  const router = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(0deg, rgba(243,229,245,1) 0%, rgba(74,20,140,1) 100%)',
          backgroundRepeat: 'no-repeat'
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
          <h2 style={{ color: 'white' }}>
            Ops! Aconteceu algo errado por aqui!
          </h2>
          <Text
            variant="body3"
            styleSheet={{
              marginBottom: '32px',
              color: appConfig.theme.colors.neutrals[300]
            }}
          ></Text>
          <Button
            type="button"
            label="Back to Home Page"
            onClick={() => {
              router.push('/')
            }}
            buttonColors={{
              contrastColor: appConfig.theme.colors.neutrals['000'],
              mainColor: appConfig.theme.colors.primary[500],
              mainColorLight: appConfig.theme.colors.primary[400],
              mainColorStrong: appConfig.theme.colors.primary[600]
            }}
          />
        </Box>
      </Box>
    </>
  )
}
