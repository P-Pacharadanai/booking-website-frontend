export default function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
