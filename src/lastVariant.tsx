import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import './App.css'
import { IOption, IShippingFields } from './app.interface'
import ReactSelect from 'react-select'
import { getValue, options } from './controller'


function App() {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IShippingFields>({
    mode: 'onChange' // all при всех | onBlur - при фокусе на инпуте | onChange - при изменении|  onSubmit - по кнопке
  })

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name ${data.name}`)
    console.log(data)
    reset()
  }


  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Введите свою информацию о заказе</h1>
      <form style={{width: '65%', margin: '0 auto'}} onSubmit={handleSubmit(onSubmit)}>
        <div >
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
        </div>

        <div>
          <input type='text'
            placeholder='name'
            {...register('name', {
              // required: true
              required: 'name - обязательное поле',
            }
            )} />
          {errors.name && <div style={{ color: 'red' }}>Текст ошибки {errors.name.message}</div>}
        </div>

        <div style={{width: '69%', margin: '0 auto'}}> 
          <Controller control={control} name='address.country'  // name: поле которое будем менять
            rules={{
              required: 'обязательное поле страна'
            }}
            render={
              ({ field: { onChange, value }, fieldState: { error } }) => (
                <div >
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
        </div>

        <div>
          <input type='text'
            placeholder='city'
            {...register('address.city', {
              // required: true
              required: 'city - обязательное поле',
            }
            )} />
          {errors.address?.city && <div style={{ color: 'red' }}>Текст ошибки {errors.address.city.message}</div>}
        </div>
        
        <div>
          <input type='text'
            placeholder='house'
            {...register('address.house', {
              // required: true
              required: 'house - обязательное поле',
            }
            )} />
          {errors.address?.house && <div style={{ color: 'red' }}>Текст ошибки {errors.address.house.message}</div>}
        </div>

        <div>
          <input type='text'
            placeholder='street'
            {...register('address.street', {
              // required: true
              required: 'street - обязательное поле',
            }
            )} />
          {errors.address?.street && <div style={{ color: 'red' }}>Текст ошибки {errors.address.street.message}</div>}
        </div>

        <button type='submit'>SEND</button>

      </form >
    </div>


  )
}

export default App
