interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return (
    <button>{title}</button>
  )
}

export function App() {
  return (
    <>
      <Button title="Send 1" />
      <Button title="Send 2" />
    </>
  )
}
