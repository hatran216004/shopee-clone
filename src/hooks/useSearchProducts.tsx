import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'searchValue'>
const searchSchema = schema.pick(['searchValue'])
const useSearchProducts = () => {
    const queryConfig = useQueryConfig()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm<FormData>({
        resolver: yupResolver(searchSchema),
        defaultValues: {
            searchValue: ''
        }
    })

    const onSubmitSearch = handleSubmit((data) => {
        const config = queryConfig.order
            ? omit(
                  {
                      ...queryConfig,
                      name: data.searchValue
                  },
                  ['order', 'sort_by']
              )
            : {
                  ...queryConfig,
                  name: data.searchValue
              }

        navigate({
            pathname: path.home,
            search: createSearchParams(config).toString()
        })
    })
    return { register, onSubmitSearch }
}

export default useSearchProducts
