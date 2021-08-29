export interface IAssignedTask {
  TaskId: number
  UserId: number
}

export interface ICategory {
  id: number
  title: string
}

export interface IUser {
  id: number
  name: string
  profileUrl: string | null
  AssignedTasks?: IAssignedTask
}

export interface IGrocery {
  id: number
  item: string
  quantity: number
  details: string
  UserId: number
  FamilyId: number
  bought: boolean
  Categories: ICategory[]
}

export interface IRecipe {
  id: number
  name: string
  description: string
  notes: string
  preparation: string
  ingredients: string
}

export interface INavLink {
  title: string
  path: string
}

export interface ITask {
  id: number
  FamilyId: number
  name: string
  notes: string
  completed: boolean
}

export interface IReducerState {
  isLoading: boolean
  isError: boolean
  error: string
  isSuccess: boolean
}
