import { SubmitHandler, useForm } from 'react-hook-form'
import './App.css'
import { IShippingFields } from './app.interface'

function App() {
  const { register, handleSubmit, formState: { errors }, reset, resetField } = useForm<IShippingFields>()

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

        <div>
          <button>Send</button>
        </div>
      </form>
    </>
  )
}

export default App
