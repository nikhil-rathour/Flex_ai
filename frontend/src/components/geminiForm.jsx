import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/authService';
import { handleApiError, handleApiSuccess } from '../utils/errorHandler';

const websiteTypes = ['Portfolio','Business', 'Landing Page'];
const portfolioSections = ['Header', 'Hero', 'About', 'Projects', 'Contact', 'Skills' , 'Footer'];
const businessSections = ['Header', 'Hero', 'About', 'Products', 'Contact' , 'Footer' , 'Services'];
const landingPageSections = ['Header', 'Hero', 'About', 'Contact', 'Services' , 'Footer'];
const layoutOptions = [
  'classic-vertical-spa',
  'split-screen',
  'sidebar-spa',
  'centered-editorial',
  'hero-first-landing',
  'card-grid',
  'timeline-story',
  'fullscreen-sections',
  'bento-magazine',
  'dashboard-overview'
];

const GeminiForm = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [context, setcontext] = useState('')
   const [websiteType, setwebsiteType] = useState('')
   const [sections, setSections] = useState([]);
   const [layout, setLayout] = useState('');
   const [profileImage, setProfileImage] = useState(null);
   const [additionalImages, setAdditionalImages] = useState([{ label: '', url: '' }]);
   const [socialLinks, setSocialLinks] = useState([{ label: '', url: '' }]);
   const selectedPalette = location.state?.selectedPalette;
   const username = location.state?.username;
  const [loading, setLoading] = useState(false);

  const toggleSection = (section) => {
    setSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getAvailableSections = () => {
    if (websiteType === 'Portfolio') return portfolioSections;
    if (websiteType === 'Business') return businessSections;
    if (websiteType === 'Landing Page') return landingPageSections;
    return [];
  };

  const addImageField = () => {
    setAdditionalImages([...additionalImages, { label: '', url: '' }]);
  };

  const removeImageField = (index) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const updateImageField = (index, field, value) => {
    const updated = [...additionalImages];
    updated[index][field] = value;
    setAdditionalImages(updated);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { label: '', url: '' }]);
  };

  const removeSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post("http://localhost:4000/api/gemini/generate" , {
        websiteType, 
        sections: sections.join(','), 
        context,
        palette: selectedPalette,
        layout,
        profileImage,
        additionalImages: additionalImages.filter(img => img.url && img.label),
        socialLinks: socialLinks.filter(link => link.url && link.label)
      });
      handleApiSuccess('Code generated successfully!');
      navigate('/preview', { 
        state: { 
          generatedCode: response.data.output,
          websiteType,
          sections: sections.join(','),
          context,
          palette: selectedPalette,
          layout,
          profileImage,
          additionalImages: additionalImages.filter(img => img.url && img.label),
          socialLinks: socialLinks.filter(link => link.url && link.label)
        } 
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Build Your Website</h2>
        
        {username && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl text-center">
            <p className="text-sm text-gray-600">Your website: <span className="font-mono font-bold text-blue-600">localhost/{username}</span></p>
          </div>
        )}

        {selectedPalette && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold mb-3 text-gray-700">Selected Palette: {selectedPalette.name}</p>
            <div className="flex gap-2 justify-center">
              {Object.values(selectedPalette.colors).map((color, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-lg shadow-md"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Website Type</label>
            <div className="grid grid-cols-2 gap-3">
              {websiteTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setwebsiteType(type);
                    setSections([]);
                  }}
                  className={`p-3 rounded-lg border-2 transition font-medium ${
                    websiteType === type
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Website Layout</label>
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a layout</option>
              {layoutOptions.map((layoutOption) => (
                <option key={layoutOption} value={layoutOption}>
                  {layoutOption.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          {websiteType && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-700">Select Sections</label>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                {getAvailableSections().map((section) => (
                  <label
                    key={section}
                    className="flex items-center space-x-2 p-2 hover:bg-white rounded cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={sections.includes(section)}
                      onChange={() => toggleSection(section)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{section}</span>
                  </label>
                ))}
              </div>
              {sections.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">{sections.length} section(s) selected</p>
              )}
            </div>
          )}

          {websiteType === 'Portfolio' && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">Profile Image URL</label>
                <input
                  type="url"
                  value={profileImage || ''}
                  onChange={(e) => setProfileImage(e.target.value)}
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Add a profile image for your portfolio</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">Additional Images</label>
                {additionalImages.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={image.label}
                      onChange={(e) => updateImageField(index, 'label', e.target.value)}
                      placeholder="Image label (e.g., Project 1)"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={image.url}
                      onChange={(e) => updateImageField(index, 'url', e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {additionalImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  + Add Image
                </button>
                <p className="text-xs text-gray-500 mt-1">Optional: Add images for projects or gallery</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">Social Links</label>
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateSocialLink(index, 'label', e.target.value)}
                      placeholder="Platform (e.g., GitHub, LinkedIn)"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                      placeholder="Profile URL"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {socialLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSocialLink(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSocialLink}
                  className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  + Add Social Link
                </button>
                <p className="text-xs text-gray-500 mt-1">Optional: Add social media profiles</p>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">Additional Context</label>
            <textarea
              value={context}
              onChange={(e) => setcontext(e.target.value)}
              placeholder="Tell us more about your website (e.g., your name, profession, key information)..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !websiteType || !layout || sections.length === 0 || sections.length > 10}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Generating...' : 'Generate Website'}
          </button>
          {sections.length > 10 && (
            <p className="text-xs text-red-500 text-center">Please select maximum 3 sections to avoid errors</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default GeminiForm;