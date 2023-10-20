import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import './App.css'
import { IOption, IShippingFields } from './app.interface'
import ReactSelect from 'react-select'

export const options: IOption[] = [
  {
    value: 'russian',
    label: 'Russia'
  },
  {
    value: 'china',
    label: 'China'
  },
  {
    value: 'spanish',
    label: 'Spanish'
  }
]

// не относится к хук-форм для работы селекта
export const getValue = (value: string) => value ? options.find((option) => option.value === value) : ''

function App() {
  const { register, handleSubmit, formState: { errors }, reset, resetField, setValue, control } = useForm<IShippingFields>({
    defaultValues: {
      email: 'test@email.com'
    },
    mode: 'onChange' // all при всех | onBlur - при фокусе на инпуте | onChange - при изменении|  onSubmit - по кнопке
  })

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name ${data.name}`)
    console.log(data)
    resetField('email') // сбросить конкретное поле
    reset()

  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text'
          placeholder='name'
          {...register('name', {
            // required: true
            required: 'name - обязательное поле',
          }
          )} />
        {errors.name && <div style={{ color: 'red' }}>Текст ошибки {errors.name.message}</div>}

        <input type='email'
          placeholder='email'
          {...register('email', {
            required: 'email - обязательное поле',
            pattern: {
              value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
              message: 'Пожалуйста введите валидный Email'
            }
          }
          )} />
        {errors.email && <div style={{ color: 'red' }}>Текст ошибки {errors.email.message}</div>}


        {/* контролер нужен не для инпутов тк регистр работает то на input */}
        <Controller control={control} name='address.country'  // name: поле которое будем менять
          rules={{
            required: 'обязательное поле страна'
          }}
          render={
            ({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <ReactSelect className='custom-select'
                  placeholder='Countries'
                  options={options}
                  value={getValue(value)}
                  onChange={(newValue) => onChange((newValue as IOption).value)}
                />
                {error && <div style={{ color: 'red' }}>Текст ошибки {error.message}</div>}
              </div>
            )
          } />

        <div>
          <button>Send</button>
        </div>

      </form>

      <div>
        <button onClick={() => {
          // заполнить поля данными из запроса!
          setValue('name', 'Max')
          setValue('email', 'test@tex.ru')
        }}>Fill data</button>
      </div>
    </>
  )
}

export default App
