import styled from 'styled-components'

export const Button = styled.button`
  font-size: 1em;
  margin: 1em 0;
  padding: 0.25em 1em;
  border: 2px solid MidnightBlue;
  border-radius: 3px;
  color: White;
  background: MidnightBlue;
`
export const LogoutButton = styled(Button)`
  background: LightSteelBlue;
  color: MidnightBlue;
`

export const Footer = styled.div`
  background: MidnightBlue;
  padding: 1em;
  margin-top: 5em;
  color: White;
`

export const InlineButton = styled(Button)`
  margin: 1em;
`

export const Input = styled.input`
  margin: 0.25em 0.25em 0.25em 1em;
  padding: 0.5em 0.25em;
  border-radius: 3px;
  border-style: hidden;

  &: focus {
    outline: none;
  }
`

export const Navigation = styled.div`
  background: MidnightBlue;
  padding: 1em;
  color: White;
`

export const NavLink = styled.div`
  &&& {
    color: White;
    font-size: 1.25em;
    padding: 5px;
    display: inline;

    a {
      text-decoration: none;
      color: White;
      font-weight: bold;
    }
  }
`

export const NavText = styled.p`
  margin-left: 5em;
  margin-right: 0.5em;
  display: inline;
`

export const Notification = styled.div`
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`

export const Page = styled.div`
  font-family: Helvetica Neue, sans-serif;

  a {
    text-decoration: none;
    color: MidnightBlue;
  }
`

export const Title = styled.h1`
  font-family: Tahoma, sans-serif;
  font-size: 3em;
`

export const SubTitle1 = styled(Title)`
  font-size: 2em;
`

export const SubTitle2 = styled(Title)`
  font-size: 1em;
  padding-top: 0.75em;
  margin-bottom: 0.25em;
`
