import { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils'
import {
  Button,
  Input,
  InputBase,
  Select,
  TextInput,
  Textarea
} from '@mantine/core'
import { useId } from '@mantine/hooks'
import { IMaskInput } from 'react-imask'
import {
  IconAt,
  IconPhone,
  IconCake,
  IconCalendarDue
} from '@tabler/icons-react'
import { DateInput } from '@mantine/dates'

export default function CreatePersonForm() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  //-----------------------------------------------------
  const [bloodGroups, setBloodGroups] = useState([])
  const [martialStatus, setMartialStatus] = useState([])
  const [education, setEducation] = useState([])

  const [bloodGroupId, setBloodGroupId] = useState(null)
  const [martialStatusId, setMartialStatusId] = useState(null)
  const [educationId, setEducationId] = useState(null)

  const id = useId()

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance
        .get('martialStatus')
        .then((response) => setMartialStatus(response.data))
        .catch((err) => console.log('Veri Bulunamadı!!!', err))
      await axiosInstance
        .get('education')
        .then((response) => {
          setEducation(
            response.data.map((education) => {
              return {
                label: education.name,
                value: education.id
              }
            })
          )
        })
        .catch((err) => console.log('Veri Bulunamadı!!!', err))
      await axiosInstance
        .get('bloodGroup')
        .then((response) => {
          setBloodGroups(
            response.data.map((bloodGroup) => {
              return {
                label: bloodGroup.name,
                value: bloodGroup.id
              }
            })
          )
        })
        .catch((err) => console.log('Veri Bulunamadı!!!', err))
    }
    fetchData()
  }, [])

  const onSave = async () => {
    const data = {
      name,
      surname,
      birthDate: birthDate? new Date(birthDate).toLocaleDateString() : '',
      bloodGroupId,
      phoneNumber,
      email,
      address,
      // martialStatusId,
      educationId
    }
    await axiosInstance.post('employees', data).then(()=>window.location.reload()).catch((err) => console.log(err))
  }

  return (
    <div>
      <hr className="mb-2" />
      <div>
        <h2>Kişisel Bilgiler</h2>
        {/* Adı Soyadı */}
        <div className="flex space-x-2 justify-center">
          <TextInput
            placeholder="Adınızı Giriniz!"
            label="Adınız"
            radius="md"
            // error="İsminizi Giriniz"
            value={name}
            withAsterisk
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <TextInput
            placeholder="Soyadınız"
            label="Soyadınızı Giriniz!"
            radius="md"
            // error="Soyadınızı Giriniz"
            withAsterisk
            value={surname}
            onChange={(event) => setSurname(event.currentTarget.value)}
          />
        </div>
        {/* Telefon Numarası - EMail Adresi */}
        <div className="flex space-x-2">
          {/* Telefon Numarası */}
          <Input.Wrapper
            id={id}
            label="Telefon numaranız"
            required
            maw={320}
            mx="auto"
          >
            <Input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.currentTarget.value)}
              icon={<IconPhone />}
              component={IMaskInput}
              mask="+90 (000) 000 00 00"
              id={id}
              placeholder="+90 (000) 000 00 00"
              radius="md"
            />
          </Input.Wrapper>
          {/* EMail Adresi */}
          <Input.Wrapper label="Email Adresiniz" required maw={320} mx="auto">
            <Input
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              icon={<IconAt />}
              radius="md"
              placeholder="email@adresiniz.com"
            />
          </Input.Wrapper>
        </div>
        {/* Oturma Adresi */}
        <div>
          <Textarea
            value={address}
            onChange={(event) => setAddress(event.currentTarget.value)}
            placeholder="Adresiniz"
            label="Adresinizi yazınız"
            radius="md"
            withAsterisk
          />
        </div>
        {/* Doğum Tarihi - Kan Grubu */}
        <div>
          <DateInput
            value={birthDate}
            onChange={setBirthDate}
            icon={<IconCake />}
            valueFormat="YYYY MMM DD"
            label="Doğum Tarihiniz"
            required
            placeholder="Gün Ay Yıl"
            radius="md"
            mx="auto"
          />
          <Select
            value={bloodGroupId}
            onChange={setBloodGroupId}
            label="Kan Gurubu"
            placeholder="Şeçiniz"
            searchable
            nothingFound="Aradığınız öğe yok"
            data={bloodGroups}
          />
        </div>
      </div>
      <hr className="mb-2 mt-5" />
      <div>
        <h2>Eğitim ve İş Bilgileri</h2>
        {/* Eğitim Durumu - İş Başlama Tarihi - İletişim Birimi Başlama Tarihi */}
        <div>
          <Select
            value={educationId}
            onChange={setEducationId}
            label="Eğitim Durumu"
            placeholder="Seçiniz"
            searchable
            nothingFound="Aradığınız öğe yok"
            data={education}
          />
          <DateInput
            icon={<IconCalendarDue />}
            className="mt-5 mb-3"
            valueFormat="YYYY MMM DD"
            label="İşe Giriş Tarihiniz"
            required
            placeholder="Gün Ay Yıl"
            radius="md"
            mx="auto"
          />
          <DateInput
            className="mt-5 mb-3"
            icon={<IconCalendarDue />}
            valueFormat="YYYY MMM DD"
            label="İletişim Birimine Başlama Tarihiniz"
            required
            placeholder="Gün Ay Yıl"
            radius="md"
            mx="auto"
          />
        </div>
      </div>
      <Button
        onClick={onSave}
        className="text-white bg-green-700 hover:bg-slate-800 hover:text-white mt-5"
      >
        Oluştur
      </Button>
    </div>
  )
}
