import { expect, APIRequestContext} from "@playwright/test";
import { TaskModel } from "../fixtures/task.model";
import 'dotenv/config';

const BASE_API = process.env.BASE_API

export async function deleteTaskByHelper(request: APIRequestContext, taskName: string){
  await request.delete(`${BASE_API}/helper/tasks/${taskName}`);
}

export async function postTask (request: APIRequestContext, task: TaskModel) {
  //Variable that creates task from API using task variable
  const newTask = await request.post(`${BASE_API}/tasks`, { data: task });//Funcion that expects to status code 200 from the API
  expect(newTask.ok()).toBeTruthy();
}