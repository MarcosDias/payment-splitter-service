# Solution

A solução consiste na construção de um serviço principal chamado `payment-splitter-service`, que será o microserviço responsável em receber as requests e realizar os processamento das regras de negócio necessárias, além da utilização de alguns serviços da AWS como SQS, SNS, S3 e SES:

![Top donw solution](./assets/solution.png) 

## Some use cases

To exemplify the flow and make it easier to understand, two happy path use cases were chosen to be mapped within a sequence diagram:

### Adding a new expense

![Expense added Sequence Diagram](./assets/add_expense/expense_added.png)

### CSV file upload

![CSV File upload Sequence Diagram](./assets/csv_upload/csv_upload.png)

## Limitations and Possibilities

The solution was designed based on the requirements presented in the `problem.md` file, so it is possible to notice some limitations and possibilities within this design:
- Requests are received directly by the `payment-splitter-service`
    - Protections (such as rate limit, authentication, authorization, etc.) that would need to be applied in this microservice could be moved to a new component (api-gateway or BFF - Backend For Frontend) that would act as middleware between the client/internet and the internal services
- Between the `payment-splitter-service` and the AWS SES service we could add a new service that would register these notifications and manage this information, in this way we could bring this information back to the user through a notification screen
- As the focus was on keeping the solution design more concise with a focus on solving the problem, file processing was also kept in the same microservice. With more information about the average use of this functionality and the number of records that may exist within this file, we can evaluate the creation of a new service (a new microservice or even a lambda) to read and process this data.