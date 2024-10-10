import { VitePWA } from "vite-plugin-pwa";

export default {
	plugins: [
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico"],
			manifest: {
				short_name: "the list picker",
				name: "the list picker",
				icons: [
					{
						src: "icon.png",
						type: "image/png",
						sizes: "512x512 any maskable"
					}
				],
				display: "standalone",
				theme_color: "#f5f5f5",
				background_color: "#f5f5f5"
			}
		})
	]
};
