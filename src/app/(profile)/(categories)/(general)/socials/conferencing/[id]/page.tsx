import Body from "./_components/body";

// Define the IParams interface
type Props = {
  params: Promise<{
  id: string;
}>
}

const MeetingPage = async ({ params }: Props) => {
  const { id } = await params;
  return (
  <Body id={id} />
  );
};

export default MeetingPage;
