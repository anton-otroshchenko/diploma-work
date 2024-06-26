import { useDispatch, useSelector } from 'react-redux'
import { type RootState, type AppDispatch } from '../store/store.ts'

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { useAppDispatch, useAppSelector };