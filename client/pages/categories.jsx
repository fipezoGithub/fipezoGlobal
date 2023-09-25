import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function Categories(props) {
  return (
    <>
      <Head>
        <title>Fipezo | Categories</title>
      </Head>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      {/* <div className="flex flex-col items-center pt-12 mx-6">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/photographer-cat-page.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#9fd7df]">
              photographer
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
              modi iste consequuntur illo atque error doloremque ducimus maiores
              ea cum architecto tempora nobis odit quae perferendis commodi quo,
              repudiandae fuga maxime. Distinctio nemo natus totam. Quas
              laboriosam sunt nihil ea a animi praesentium, illum, asperiores
              molestias placeat cum commodi hic aspernatur perspiciatis nam
              delectus repellendus modi debitis cupiditate. Nulla amet
              praesentium, ipsam sunt fugit non magnam cumque accusantium saepe
              doloribus, voluptates reiciendis veniam sit nihil mollitia eaque
              unde deleniti repellendus, explicabo doloremque expedita iusto
              architecto ipsa quas! Dolorum itaque, laboriosam voluptatum quam
              necessitatibus maiores fugiat quisquam iusto quas ullam tenetur.
              Mollitia doloribus placeat dignissimos reiciendis provident animi
              culpa voluptatum, obcaecati porro qui sed, commodi sequi
              perferendis velit fuga reprehenderit sint nulla iste perspiciatis.
              Perferendis pariatur tenetur vero sunt ipsam. Consectetur delectus
              temporibus vel laborum eius dolor at impedit blanditiis dolore
              minus architecto eos recusandae consequatur modi sunt tenetur
              odio, tempore, quis atque rem nulla nemo ad neque! Itaque
              quibusdam, numquam consequuntur voluptas velit blanditiis quas
              exercitationem quam quos sapiente iusto!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#5ce678]">
              cinematographer
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
              modi iste consequuntur illo atque error doloremque ducimus maiores
              ea cum architecto tempora nobis odit quae perferendis commodi quo,
              repudiandae fuga maxime. Distinctio nemo natus totam. Quas
              laboriosam sunt nihil ea a animi praesentium, illum, asperiores
              molestias placeat cum commodi hic aspernatur perspiciatis nam
              delectus repellendus modi debitis cupiditate. Nulla amet
              praesentium, ipsam sunt fugit non magnam cumque accusantium saepe
              doloribus, voluptates reiciendis veniam sit nihil mollitia eaque
              unde deleniti repellendus, explicabo doloremque expedita iusto
              architecto ipsa quas! Dolorum itaque, laboriosam voluptatum quam
              necessitatibus maiores fugiat quisquam iusto quas ullam tenetur.
              Mollitia doloribus placeat dignissimos reiciendis provident animi
              culpa voluptatum, obcaecati porro qui sed, commodi sequi
              perferendis velit fuga reprehenderit sint nulla iste perspiciatis.
              Perferendis pariatur tenetur vero sunt ipsam. Consectetur delectus
              temporibus vel laborum eius dolor at impedit blanditiis dolore
              minus architecto eos recusandae consequatur modi sunt tenetur
              odio, tempore, quis atque rem nulla nemo ad neque! Itaque
              quibusdam, numquam consequuntur voluptas velit blanditiis quas
              exercitationem quam quos sapiente iusto!
            </p>
          </div>
          <Image src="/cinematographer-cat-logo.png" width={450} height={250} />
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/album-designer-cat-logo.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#ff725e]">
              album designer
            </h2>
            <p className="text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
              modi iste consequuntur illo atque error doloremque ducimus maiores
              ea cum architecto tempora nobis odit quae perferendis commodi quo,
              repudiandae fuga maxime. Distinctio nemo natus totam. Quas
              laboriosam sunt nihil ea a animi praesentium, illum, asperiores
              molestias placeat cum commodi hic aspernatur perspiciatis nam
              delectus repellendus modi debitis cupiditate. Nulla amet
              praesentium, ipsam sunt fugit non magnam cumque accusantium saepe
              doloribus, voluptates reiciendis veniam sit nihil mollitia eaque
              unde deleniti repellendus, explicabo doloremque expedita iusto
              architecto ipsa quas! Dolorum itaque, laboriosam voluptatum quam
              necessitatibus maiores fugiat quisquam iusto quas ullam tenetur.
              Mollitia doloribus placeat dignissimos reiciendis provident animi
              culpa voluptatum, obcaecati porro qui sed, commodi sequi
              perferendis velit fuga reprehenderit sint nulla iste perspiciatis.
              Perferendis pariatur tenetur vero sunt ipsam. Consectetur delectus
              temporibus vel laborum eius dolor at impedit blanditiis dolore
              minus architecto eos recusandae consequatur modi sunt tenetur
              odio, tempore, quis atque rem nulla nemo ad neque! Itaque
              quibusdam, numquam consequuntur voluptas velit blanditiis quas
              exercitationem quam quos sapiente iusto!
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#407bff]">
              anchor
            </h2>
            <p className="text-lg">
              An event anchor is the unsung hero of any gathering, serving as
              the master of ceremonies who skillfully guides the audience
              through the proceedings. Their role is pivotal in ensuring that an
              event runs smoothly and captivates the attendees. Primarily, an
              event anchor is responsible for setting the tone and creating a
              welcoming atmosphere. They engage the audience with charisma and
              enthusiasm, often incorporating humor and charm to break the ice
              and establish a connection. Whether it's a corporate conference, a
              wedding reception, a cultural festival, or a sports event, the
              event anchor adapts their style to match the occasion, making them
              a versatile asset. One of their most critical functions is to
              introduce and transition between different segments of the event,
              such as speakers, performers, or activities, making these
              transitions seamless. They also keep the audience informed about
              the schedule, special announcements, and any changes, ensuring
              everyone is in the loop. In essence, an event anchor is like the
              conductor of an orchestra, orchestrating the event's rhythm and
              energy. Their ability to connect with the audience, manage time,
              and maintain a sense of excitement can transform an ordinary event
              into an extraordinary experience that lingers in the memories of
              attendees for years to come.
            </p>
          </div>
          <Image src="/anchor-cat-page.png" width={450} height={250} />
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/dancer-cat-page.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#ba68c8]">
              dancer
            </h2>
            <p className="text-lg">
              A dancer is a skilled and artistic performer who uses their body
              as a means of expression, conveying emotions, stories, and ideas
              through movement. Dancing is a universal form of human expression
              that transcends language barriers and communicates on a deeply
              emotional level. Dancers possess exceptional physical abilities,
              including flexibility, strength, balance, and coordination. They
              dedicate countless hours to rigorous training, honing their skills
              in various dance styles, such as ballet, contemporary, hip-hop, or
              traditional cultural dances. Beyond their physical prowess,
              dancers are also masters of storytelling. They use their bodies to
              narrate tales, evoke emotions, and convey messages to their
              audience. Through precise choreography, dancers synchronize their
              movements with music, creating a captivating and immersive
              experience for viewers. Dancers are artists who bring imagination
              to life on stage, captivating audiences with their grace, power,
              and charisma. They undergo years of disciplined practice, pushing
              the boundaries of their physical capabilities, to deliver
              performances that are not only visually stunning but also deeply
              meaningful. Whether performing on a grand stage or in an intimate
              setting, dancers are the embodiment of beauty, creativity, and the
              power of human expression through movement.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#dd7f54]">DJ</h2>
            <p className="text-lg">
              A DJ, short for Disc Jockey, is a musical artist who specializes
              in curating and mixing recorded music for live audiences or radio
              broadcasts. DJs play a pivotal role in the world of music and
              entertainment, using their skills to create memorable sonic
              experiences that resonate with diverse crowds. DJs have a deep
              understanding of music genres, rhythms, and the art of seamless
              transitions between tracks. They possess a keen sense of timing
              and an ability to read the energy of a room, tailoring their
              selections to suit the mood and preferences of their audience.
              This adaptability is a hallmark of their craft. In addition to
              their technical prowess, DJs often bring a unique personality and
              style to their performances. They can be found in various
              settings, from nightclubs and music festivals to weddings and
              corporate events, and each DJ adds their distinctive touch to
              these occasions. The role of a DJ extends beyond merely playing
              songs; they can be musical storytellers, mood-setters, and crowd
              motivators. Many DJs also produce their music, creating original
              tracks and remixes that contribute to the evolution of music
              itself. In the digital age, technology has revolutionized DJing,
              with the advent of digital turntables and software allowing for
              innovative mixing techniques and a broader sonic palette. As
              cultural influencers, DJs bridge the gap between artists and their
              fans, shaping the musical landscape and bringing people together
              through the universal language of music.
            </p>
          </div>
          <Image src="/DJ-cat-page.png" width={450} height={250} />
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/Drone-cat-page.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#ffc727]">
              Drone Operator
            </h2>
            <p className="text-lg">
              A drone operator is a skilled individual responsible for piloting
              unmanned aerial vehicles (UAVs), commonly known as drones, for
              various purposes across diverse industries. These highly trained
              professionals play a crucial role in the rapidly expanding field
              of drone technology. Drone operators possess a deep understanding
              of UAV mechanics, flight dynamics, and the ability to navigate
              these vehicles with precision. They are often required to obtain
              licenses or certifications to ensure compliance with aviation
              regulations, as drones share airspace with manned aircraft. The
              responsibilities of a drone operator are multifaceted. They may
              operate drones for aerial photography and videography, assisting
              in capturing breathtaking images or surveying vast landscapes.
              Additionally, drone operators are integral to industries such as
              agriculture, where they monitor crops and gather data to optimize
              farming practices. In construction and infrastructure, they aid in
              site inspections and mapping. Safety is paramount in this role,
              with operators maintaining awareness of weather conditions and
              airspace restrictions. They are also skilled in troubleshooting
              technical issues that may arise during flights. Overall, a drone
              operator's expertise facilitates innovative solutions in a
              multitude of industries, from entertainment to agriculture and
              beyond, revolutionizing how tasks are accomplished from the skies.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#4cb51c]">
              Graphics designer
            </h2>
            <p className="text-lg">
              A graphic designer is a creative professional responsible for
              visually communicating ideas, messages, and information through
              various forms of visual media. They play a pivotal role in shaping
              the aesthetics and visual identity of brands, products,
              publications, and digital content. Graphic designers utilize a
              combination of artistic skills, technical expertise, and digital
              tools to create compelling visual elements that captivate and
              inform audiences. One of the primary tasks of a graphic designer
              is to craft visually appealing designs that align with a client's
              or organization's objectives. This involves conceptualizing ideas,
              selecting appropriate color schemes, typography, and images, and
              arranging these elements harmoniously to convey a coherent
              message. They work across a wide spectrum of mediums, including
              print materials, websites, social media, packaging, and more.
              Effective graphic designers possess a keen eye for detail, a deep
              understanding of design principles, and proficiency in software
              like Adobe Creative Suite (e.g., Photoshop, Illustrator,
              InDesign). They must also stay up-to-date with design trends and
              technological advancements to remain relevant in a rapidly
              evolving field. In essence, graphic designers are visual
              storytellers, translating concepts and information into visually
              engaging and impactful designs that leave a lasting impression on
              viewers. Their work influences our perception of the world, making
              them integral to marketing, branding, and communication efforts
              across industries.
            </p>
          </div>
          <Image
            src="/graphics-designer-cat-logo.png"
            width={450}
            height={250}
          />
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/influencer-cat-logo.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#407bff]">
              Influencer
            </h2>
            <p className="text-lg">
              An influencer is a charismatic and authoritative figure in the
              digital realm who wields significant influence over a specific
              audience or niche. They have harnessed the power of social media
              and online platforms to connect with and captivate their
              followers, inspiring them to adopt their opinions, behaviors, and
              preferences. What distinguishes an influencer is their ability to
              shape trends, promote products, and spark discussions within their
              community. Influencers come in various forms, from fashionistas
              and beauty gurus to tech experts and lifestyle enthusiasts. Their
              content is typically a blend of personal experiences, expert
              advice, and relatable narratives that resonate with their target
              audience. They build trust by sharing their genuine thoughts and
              experiences, creating a sense of authenticity that sets them apart
              from traditional celebrities. Collaborations with influencers have
              become a cornerstone of modern marketing, allowing brands to tap
              into their extensive reach and credibility. Influencers offer a
              unique conduit for advertisers to connect with consumers in a more
              organic and engaging manner. In a rapidly evolving digital
              landscape, influencers continue to play a pivotal role in shaping
              consumer behavior and driving online conversations, making them a
              dynamic force in contemporary media and marketing.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#bb92e3]">
              Makeup Artist
            </h2>
            <p className="text-lg">
              A makeup artist is a skilled and creative professional dedicated
              to enhancing a person's appearance through the art of cosmetics.
              These talented individuals possess a profound understanding of
              facial features, skin types, and color theory, allowing them to
              transform their clients into their desired look, whether it's for
              a special event, photo shoot, film, or everyday wear. Makeup
              artists use a wide range of makeup products, including
              foundations, eyeshadows, lipsticks, and more, to highlight a
              client's best features and conceal imperfections. They must
              carefully select the right colors and textures to complement a
              person's skin tone and style, making sure the makeup harmonizes
              with their overall aesthetic. Moreover, makeup artists often work
              closely with hairstylists and fashion stylists to ensure a
              cohesive and polished look. They need to stay up-to-date with the
              latest beauty trends and techniques to meet their clients' diverse
              needs. Beyond technical expertise, makeup artists also possess
              excellent communication and interpersonal skills, as they
              collaborate closely with clients to understand their preferences
              and translate their vision into reality. A makeup artist's ability
              to boost their clients' confidence and help them feel beautiful is
              a testament to their artistic talents and dedication to the craft.
            </p>
          </div>
          <Image src="/Makeup-artist-cat-logo.png" width={450} height={250} />
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/model-cat-logo.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#ff4040]">
              Model
            </h2>
            <p className="text-lg">
              A model is the embodiment of style, grace, and artistry within the
              world of fashion. These individuals serve as living canvases,
              showcasing the creativity of designers and the allure of their
              garments. A fashion model's role extends far beyond mere beauty;
              they are storytellers who breathe life into couture. Fashion
              models possess striking physical attributes, from their height,
              proportions, and facial features, but they are also masters of
              versatility. They effortlessly transition from one runway to
              another, adapting their walk, expression, and attitude to suit the
              designer's vision. Their presence is magnetic, commanding
              attention on catwalks and in front of cameras. These models are
              not just mannequins; they are creative collaborators, working
              closely with photographers, stylists, and makeup artists to bring
              concepts to life. They have the ability to convey a wide range of
              emotions and moods through their expressions and body language,
              making them essential in shaping the narrative of fashion
              campaigns. Beyond the glamorous facade, a successful fashion model
              must possess discipline, resilience, and adaptability, as they
              navigate a highly competitive and demanding industry. They are the
              embodiment of fashion's dreams and aspirations, inspiring both
              designers and fashion enthusiasts alike with their poise,
              elegance, and the promise of endless possibilities.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold">Photo Editor</h2>
            <p className="text-lg">
              A photo editor is a versatile software tool that empowers users to
              enhance, modify, and transform their digital images. With its
              array of features and capabilities, a photo editor serves as an
              essential tool for photographers, designers, and even casual
              enthusiasts. At its core, a photo editor allows users to adjust
              various aspects of an image, such as brightness, contrast,
              saturation, and color balance. It provides a platform for
              cropping, resizing, and rotating images to achieve the desired
              composition. Additionally, users can apply a wide range of
              creative filters and effects, giving photos an artistic flair or a
              vintage look. One of the most powerful functions of a photo editor
              is retouching. Users can remove blemishes, wrinkles, and
              imperfections, resulting in flawless portraits. Advanced editing
              tools enable intricate tasks like background removal and object
              manipulation. For photographers, photo editors often support RAW
              image processing, allowing for greater control over exposure and
              detail. Furthermore, the software facilitates batch processing,
              making it efficient to apply the same edits to multiple photos.
              Overall, a photo editor is a must-have tool for anyone seeking to
              elevate their visual content. Its versatility and user-friendly
              interface make it accessible to both beginners and professionals,
              making it an indispensable part of the digital photography and
              design landscape.
            </p>
          </div>
          <Image src="/photo-editor-cat-logo.png" width={450} height={250} />
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <Image src="/video-editor-cat-logo.png" width={450} height={250} />
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#ff5edd]">
              video Editor
            </h2>
            <p className="text-lg">
              A video editor is a crucial software tool designed for the
              manipulation and enhancement of digital video content. It serves
              as the creative hub for filmmakers, content creators, and video
              enthusiasts, enabling them to craft engaging and polished videos
              for various purposes. Video editors offer a wide range of
              functionalities, including video trimming, cutting, merging, and
              the addition of transitions. They allow users to adjust visual
              elements such as brightness, contrast, and color saturation,
              ensuring that the final product meets their artistic vision.
              Moreover, video editors facilitate the integration of audio
              elements, enabling synchronization with video clips and the
              addition of music, voiceovers, or sound effects. Advanced video
              editing software often includes special effects, filters, and
              animation capabilities to take videos to the next level of
              creativity. Users can also add text overlays, subtitles, and
              graphics to enhance storytelling and engage the audience
              effectively. Video editors are essential for professionals in the
              film and advertising industries, as well as for social media
              influencers, vloggers, and anyone interested in producing
              high-quality video content. With user-friendly interfaces and
              powerful tools, video editors empower individuals to unleash their
              creativity and transform raw footage into captivating visual
              narratives.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-2xl capitalize font-bold text-[#0c5428]">
              web developer
            </h2>
            <p className="text-lg">
              A web developer is a skilled professional responsible for creating
              and maintaining websites and web applications. They play a crucial
              role in the digital landscape, turning concepts and designs into
              functional, user-friendly websites that serve a variety of
              purposes, from e-commerce to information dissemination. Web
              developers possess a strong grasp of programming languages such as
              HTML, CSS, and JavaScript, which are the building blocks of the
              web. They use these languages to structure web content, design
              layouts, and implement interactive features. Additionally, web
              developers often work with frameworks and libraries like React,
              Angular, or Vue.js to streamline development and enhance user
              experiences. Collaboration is a significant aspect of a web
              developer's role, as they frequently work alongside designers,
              project managers, and clients to ensure that the final product
              aligns with the intended vision and meets all functional
              requirements. They also focus on optimizing websites for
              performance, responsiveness, and security, ensuring seamless user
              experiences across various devices and browsers. Web developers
              must stay current with evolving web technologies and trends to
              remain effective in their field. Their work contributes to the
              online presence of businesses and organizations, making them
              integral to the digital success of today's interconnected world.
            </p>
          </div>
          <Image src="/web-developer-cat-logo.png" width={450} height={250} />
        </div>
      </div> */}
      <Footer />
    </>
  );
}
