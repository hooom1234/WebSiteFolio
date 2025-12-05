import {
  FaXTwitter,
  FaFacebook,
  FaGithub,
  FaDiscord,
} from "react-icons/fa6";

const SocialIcons = () => {
  return (
    <div className="my-5 flex items-center justify-center">


      <a
        href="https://github.com/hooom1234"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-3 text-zinc-400 hover:text-[#69c7c7] drop-shadow-[1px_1px_0_#7836cf]"
        aria-label="Github"
      >
        <FaGithub className="h-7 w-7" />
      </a>

      <a
        href="https://discordapp.com/users/739351801312313395"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-3 text-zinc-400 hover:text-[#69c7c7] drop-shadow-[1px_1px_0_#7836cf]"
        aria-label="Discord"
      >
        <FaDiscord className="h-7 w-7" />
      </a>

      <a
        href="https://www.facebook.com/tawan.nnn.196721"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-3 text-zinc-400 hover:text-[#69c7c7] drop-shadow-[1px_1px_0_#7836cf]"
        aria-label="Facebook"
      >
        <FaFacebook className="h-7 w-7" />
      </a>
    </div>
  );
};

export default SocialIcons;
