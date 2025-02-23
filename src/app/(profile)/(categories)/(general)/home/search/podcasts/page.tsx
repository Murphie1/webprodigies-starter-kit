import Body from "./_components/body";

interface DiscoverProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Discover = async ({ searchParams }: DiscoverProps) => {
  const params = await searchParams;
  const search = params?.search || "";

  return (
    <Body search={search} />
  );
};

export default Discover;
