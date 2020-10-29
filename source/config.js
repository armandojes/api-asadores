export const isProduction = false

const openpayCredentialsDevelop = {
  clientId: 'm5fnyled0han7jtscby7',
  key: 'sk_51595e5974ee4014a041d4e0e916b323'
}

const openpayCredentialsPRoduction = {
  clientId: 'm5fnyled0han7jtscby7',
  key: 'sk_51595e5974ee4014a041d4e0e916b323'
}

export const openPayCredentials = ENV === 'production' ? openpayCredentialsPRoduction : openpayCredentialsDevelop
