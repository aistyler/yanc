import { GetStaticProps, GetStaticPaths } from "next";
import { sampleUserData } from "../../static/sample-data";

import { User } from "../../interfaces";
import { View, ViewError } from "../../pages-view/users/id";
import { i18n } from "../../site-config";

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail: React.FC<any> = ({ item, errors }: Props) => {
  if (errors) {
    return <ViewError errors={errors} />;
  }

  return <View item={item} />;
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = [];
  for (const user of sampleUserData) {
    for (const locale of i18n.locales) {
      paths.push({
        params: { id: user.id.toString() },
        locale 
      });
    }
  }
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = sampleUserData.find((data) => data.id === Number(id));
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
