interface Props {
  name: string;
  complexity: number;
  score: number;
}

export const ScoreboardRow = ({ name, complexity, score}: Props) => {

  return (
    <tr className="text-center text-white">
      <td>{name}</td>
      <td>{complexity}</td>
      <td>{score}</td>
    </tr>
  );
};
