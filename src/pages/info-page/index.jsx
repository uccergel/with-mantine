import { Pagination } from '@mantine/core'
import CreatePersonModal from './CreatePersonModal'
import ListPage from './ListPage'
import {
  IconArrowBarToLeft,
  IconArrowBarToRight,
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal
} from '@tabler/icons-react'

export default function PersonalInfoPage() {
  return (
    <div>
      <h1 className="mb-10 mt-10 text-center font-semibold text-4xl">
        Personel Listesi
      </h1>
      <div className="mb-10">
        <CreatePersonModal />
      </div>
      <ListPage />
      <Pagination
        className="mt-10"
        total={10}
        position="center"
        withEdges
        nextIcon={IconArrowRight}
        previousIcon={IconArrowLeft}
        firstIcon={IconArrowBarToLeft}
        lastIcon={IconArrowBarToRight}
        dotsIcon={IconGripHorizontal}
      />
    </div>
  )
}
