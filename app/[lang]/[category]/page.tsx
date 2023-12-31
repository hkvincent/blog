import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { getCategoryData } from "@/lib/helpers";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { cache } from "react";

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // Get Data from Directus
  const categoryData = await getCategoryData(category, lang);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      /* images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ], */
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
        "zh-TW": `${process.env.NEXT_PUBLIC_SITE_URL}/zh/${category}`,
      },
    },
  };
};



export const generateStaticParams = async () => {
  // This for DUMMY DATA Approach
  /* return DUMMY_CATEGORIES.map((category) => {
    return {
      category: category.slug,
    };
  }); */

  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });

    const localisedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "de",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);
    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // This is for DUMMY
  /* const category = DUMMY_CATEGORIES.find(
    (category) => category.slug === params.category
  );
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLocaleLowerCase() === params.category
  ); */

  const locale = params.lang;
  const categorySlug = params.category;

  const category = await getCategoryData(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList locale={locale} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};

export default Page;
