import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/client"
import { mocked } from "ts-jest/utils"

import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from "../../services/prismic" 

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '10 de Abril'
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<PostPreview post={post} />)

    expect(screen.getByText('My New Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  // it('redirects user if no sobscription is found', async () => {
  //   const getSessionMocked = mocked(getSession)
    
  //   getSessionMocked.mockResolvedValueOnce(null)
    
  //   const response = await getServerSideProps(
  //     { params: { slug: 'my-new-post'}} as any
  //   )

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       redirect: expect.objectContaining({
  //         destination: '/'
  //       })
  //     })
  //   )
  // })

  // it('loads initial data', async () => {
  //   const getSessionMocked = mocked(getSession)
  //   const getPrismicClientMocked = mocked(getPrismicClient)
  //   getPrismicClientMocked.mockReturnValueOnce({
  //     getByUID: jest.fn().mockResolvedValueOnce({
  //       data: {
  //         title: [
  //           { type: 'heading', text: 'My new post' }
  //         ],
  //         content: [
  //           { type: 'paragraph', text: 'Post content' }
  //         ]
  //       },
  //       last_publication_date: '04-01-2021'
  //     })
  //   } as any)

  //   getSessionMocked.mockResolvedValueOnce({
  //     activeSubscription: 'fake-active-subscription'
  //   } as any)

  //   const response = await getServerSideProps(
  //     { params: { slug: 'my-new-post'}} as any
  //   )

  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       props: {
  //         post: {
  //           slug: 'my-new-post',
  //           title: 'My new post',
  //           content: '<p>Post content</p>',
  //           updatedAt: '01 de abril de 2021'
  //         }
  //       }
  //     })
  //   )
  // })
})