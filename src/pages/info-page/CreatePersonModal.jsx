import { Button, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import CreatePersonForm from './CreatePersonForm'
import { IconUserPlus } from '@tabler/icons-react'

export default function CreatePersonModal() {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} title="Personel Ekleme" centered>
        <CreatePersonForm />
      </Modal>
      <Group position="center">
        <Button
          className="text-white bg-green-700 hover:bg-slate-800 hover:text-white"
          onClick={open}
        >
          <IconUserPlus />
        </Button>
      </Group>
    </>
  )
}
