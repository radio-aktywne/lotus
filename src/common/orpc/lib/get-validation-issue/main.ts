import type {
  GetValidationIssueInput,
  GetValidationIssueOutput,
} from "./types";

export function getValidationIssue({
  error,
  path,
}: GetValidationIssueInput): GetValidationIssueOutput {
  const issue = error.data.issues.find(
    (issue) => issue.path?.join(".") === path,
  );

  const message = issue?.message;

  return { message: message };
}
