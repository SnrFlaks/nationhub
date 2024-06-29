export default function mergeClasses(
  mainClass: string,
  condition: boolean,
  conditionalClass: string
): string {
  return condition ? `${mainClass} ${conditionalClass}` : mainClass;
}
