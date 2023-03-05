import Link from 'next/link';
import { useRouter } from 'next/router';

const DumplingsBeefCheese = () => {
  const router = useRouter();
  const productName = router.query.productName;
  const flavors = [
    'veggie',
    'chicken-&-cabbage',
    'beef-&-cheese',
    'pork-&-chieves'
  ];

  const renderFlavors = () => {
    return flavors.map((flavor) => {
      if (flavor === productName) {
        return <div key={flavor}>{flavor.split('-').join(' ').toUpperCase()}</div>
      } else {
        return (
          <div key={flavor}>
            <Link href={`/products/${flavor}`}>
              {flavor.split('-').join(' ').toUpperCase()}
            </Link>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <h1>BEEF & CHEESE (50PC)</h1>
      <div>$44.95</div>
      <div>{renderFlavors()}</div>
      <div>Description</div>
    </div>
  );
};

export default DumplingsBeefCheese;