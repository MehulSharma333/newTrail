import ProfilePage from '@/components/pages/ProfilePage'
import { topCreators } from '../../database/topCreators'

const Profile = async ({ searchParams }) => {

  const topCreatorsData = await topCreators()
  const { upload } = searchParams;

  return (
    <ProfilePage uploadCheck={upload} creatorsdata={topCreatorsData} />
  )
}

export default Profile
