const apiUrl = 'http://localhost:3003/api'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${apiUrl}/testing/reset`)

    const user1 = {
      name: 'Ada Lovelace',
      username: 'adalove',
      password: 'salainen',
    }

    const user2 = {
      name: 'Grace Hopper',
      username: 'graceH',
      password: 'salainen',
    }
    cy.request('POST', `${apiUrl}/users/`, user1)
    cy.request('POST', `${apiUrl}/users/`, user2)
    cy.visit('http://localhost:3003')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('adalove')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Ada Lovelace is logged in')
      cy.get('.notification').should('contain', 'Hello Ada Lovelace! You have succesfully logged in.')
      cy.get('.notification').should('contain.css', 'color', 'rgb(0, 100, 0)')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('adalove')
      cy.get('input[name="Password"]').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong username or password.')
      cy.get('.error').should('contain.css', 'color', 'rgb(139, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'adalove', password: 'salainen' })
    })

    it('A blog can be created', function () {
      const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }

      cy.contains('Add new blog').click()

      cy.get('input[name="Title"]').type(blog.title)
      cy.get('input[name="Author"]').type(blog.author)
      cy.get('input[name="Url"]').type(blog.url)
      cy.contains(/^Add$/).click()
      cy.contains(blog.title)
    })

    describe.skip('When there are blogs in the database', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
        })
        cy.createBlog({
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        })
        cy.createBlog({
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        })
        cy.createBlog({
          title: 'Type wars',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        })
      })

      it('A blog can be liked', function () {
        cy.contains(/Like$/).click()
        cy.contains('likes 1')
        cy.contains(/Like$/).click()
        cy.contains('likes 2')
      })

      it('A blog can be deleted by the user who added it', function () {
        cy.contains('remove').click()
        cy.get('.notification').should('contain', 'Removed React patterns by Michael Chan.')
      })

      it('A blog cannot be deleted by anyone else', function () {
        cy.login({ username: 'graceH', password: 'salainen' })
        cy.get('body').should('not.contain', 'remove')
      })

      it('Blogs are ordered based on likes', function () {
        cy.contains('Type wars').contains('view').click()
        cy.contains('Type wars').contains('Like').click()
        cy.contains('Blogs').next().should('contain', 'Type wars')

        cy.contains('First class tests').contains('view').click()
        cy.contains('First class tests').contains('Like').click()
        cy.contains('First class tests').contains('likes 1')

        cy.contains('First class tests').contains('Like').click()
        cy.contains('First class tests').contains('likes 2')

        cy.contains('Blogs').next().should('contain', 'First class tests')
      })
    })
  })
})
