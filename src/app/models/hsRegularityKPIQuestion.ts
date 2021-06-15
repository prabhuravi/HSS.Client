export class HSRegularityKPIQuestion {
    Id: number;
    TemplateId: number;
    Question: string;
    HSRegularityKPIQuestionOptions: HSRegularityKPIQuestionOption[];
}

export class HSRegularityKPIQuestionOption {
    Id: number;
    QuestionId: number;
    Option: string;
}