import Container from '@/components/layout/container';
import { CircleCropTool } from '@/components/circle-crop/circle-crop-tool';

export default function CircleCropPage() {
  return (
    <Container className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <CircleCropTool />
      </div>
    </Container>
  );
}


