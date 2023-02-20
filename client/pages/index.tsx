import Post from '../components/organisms/Post'

export default function IndexPage() {
    return (
        <Post
            photoURL='' userName="testuser" userId='123456abc' postHTML={<span>Welcome to UEC!!</span>}
            replyCount={1} repostCount={2} favCount={3} postTime="February 20, 2023"
            isFavedByU={true} isRepostedByU={true}
        />
    )
}
